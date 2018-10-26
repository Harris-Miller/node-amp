import { Column, DATA_TYPE, COL_OPTION } from 'jsstore';
import connection from './service';

const DB_NAME = 'node-amp';

function getDBSchema() {
  const filesTable = {
    name: 'files',
    columns: [
      new Column('id').options([COL_OPTION.PrimaryKey, COL_OPTION.AutoIncrement]),
      new Column('filepath').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
      new Column('file_processed').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Boolean),
      new Column('process_errored').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Boolean),
      new Column('file_not_found').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Boolean),
      new Column('meta_data').setDataType(DATA_TYPE.Object)
    ]
  };

  return {
    name: DB_NAME,
    tables: [filesTable]
  };
}

connection.isDbExist(DB_NAME).then(exist => {
  if (exist) {
    connection.openDb(DB_NAME);
  } else {
    connection.createDb(getDBSchema());
  }
}).catch(err => {
  console.error(err);
});
