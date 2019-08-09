import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase("goscore");

export const initTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `create table if not exists
        game (
          id int primary key auto_increment,
          title varchar(255),
          rule_id int,
          members int,
          start_time datetime,
          end_time datetime
        );`
    );

    tx.executeSql(
      `create table if not exists
        game_rule (
          id int primary key auto_increment,
          name varchar(255),
          money int,
          start_time datetime,
          end_time datetime
        );`
    );

    tx.executeSql(
      `create table if not exists
        game_item (
          id int primary key auto_increment,
          game_id int,
          nagari bit,
          start_time datetime,
          end_time datetime
        );`
    );

    tx.executeSql(
      `create table if not exists
        player_score (
          game_item_id int,
          player int,
          win bit,
          score int,
          go_cnt int,
          shake bit,
          fbbuk int,
          pbak bit,
          gwangbak bit,
          gobak bit
        );`
    );

  })
}

export const createGame = () => {

}