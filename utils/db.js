import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase("goscore");

export const initTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `create table if not exists
        game (
          id integer primary key autoincrement,
          title varchar(255),
          rule_id integer,
          members integer,
          start_time datetime,
          end_time datetime
        );`
    );

    tx.executeSql(
      `create table if not exists
        game_player (
          id integer primary key autoincrement,
          game_id integer,
          name varchar(255)
        );`
    );

    tx.executeSql(
      `create table if not exists
        game_rule (
          id integer primary key autoincrement,
          name varchar(255),
          money integer,
          start_time datetime,
          end_time datetime
        );`
    );

    tx.executeSql(
      `create table if not exists
        game_item (
          id integer primary key autoincrement,
          game_id integer,
          nagari bit,
          start_time datetime,
          end_time datetime
        );`
    );

    tx.executeSql(
      `create table if not exists
        player_score (
          game_item_id integer,
          player_id integer,
          win bit,
          score integer,
          go_cnt integer,
          shake bit,
          fbbuk integer,
          pbak bit,
          gwangbak bit,
          gobak bit
        );`
    );

  }, (err) => {
    alert(err);
  }, () => {

  })
}

export const createGame = (title, players, onCreated, onFail) => {
  const gameObj = {
    title: title,
    players: players.map(p => ({
      name: p.name
    }))
  };

  db.transaction(tx => {
    tx.executeSql("insert into game (title, members, start_time) values (?, ?, date('now'))",
      [title, players.length], (_, { insertId: gameId }) => {
        gameObj.id = gameId;

        players.map((p, i) => {
          tx.executeSql("insert into game_player (game_id, name) values (?, ?)", [gameId, p.name],
            (_, { insertId }) => {
              gameObj.players[i].id = insertId
            })
        })

      })
  }, (err) => {
    if (onFail) {
      onFail(err);
    }
  }, (succ) => {
    onCreated(gameObj);
  })
}