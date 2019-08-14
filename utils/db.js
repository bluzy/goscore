import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase("goscore");

const boolToBit = (b) => {
  return b ? 1 : 0;
}

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
          gobak bit,
          primary key (game_item_id, player_id)
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

export const getGame = (gameId, onLoad) => {
  db.transaction(tx => {
    tx.executeSql("select g.title as title, p.id as playerId, p.name as playerName from game g join game_player p on g.id = p.game_id where g.id=?", [parseInt(gameId)],
      (_, { rows: { _array } }) => {
        const game = {
          id: gameId,
          title: _array[0].title,
          players: _array.map(a => ({
            id: a.playerId,
            name: a.playerName
          }))
        }

        onLoad(game);
      })
  })
}

export const saveHistory = (game, onSaved) => {
  const saved = {
    ...game
  };

  db.transaction(tx => {
    tx.executeSql("insert into game_item (game_id, nagari, end_time) values (?, ?, date('now'))", [game.id, boolToBit(game.nagari)],
      (_, { insertId, rowsAffected }) => {
        saved.itemId = insertId;

        saved.players.forEach(p => {
          tx.executeSql(`insert into player_score (
                            game_item_id, player_id, win, score, go_cnt,
                            shake, fbbuk, pbak, gwangbak, gobak)
                         values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [saved.itemId, p.id, p.winner ? 1 : 0, p.score, parseInt(p.go),
            boolToBit(p.winner && p.shake), p.fbbuk != null ? parseInt(p.fbbuk) : 0, boolToBit(!p.winner && p.pbak), boolToBit(!p.winner && p.gbak), boolToBit(!p.winner && p.gobak)])
        })
      })
  }, (err) => {

  }, (s) => {
    onSaved(saved);
  })
}