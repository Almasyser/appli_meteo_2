class AbstractManager{
  constructor({table}){
    this.table = table;
  }
  findAll() {
    return this.pool.query(`select * from  ${this.table} limit=100`);
  }
  find(id){
    console.log("ID passed to find method:", id); 
    return this.pool.query(`select * from ${this.table} where idcities = ?`, 
      [id]);
  }
  delete(id) {
    return this.pool.query(`delete from ${this.table} where idcities = ?`,
      [id]);
  }
  setDatabase(pool){
    this.pool = pool;
  }
}
module.exports = AbstractManager;