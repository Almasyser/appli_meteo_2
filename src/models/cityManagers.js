const AbstractManager = require('./AbstractManager');
class cityManagers extends AbstractManager{
  constructor(){
    super({
      table: "cities"
    })
  }

  modify(cityId, el) {
    const keys = Object.keys(el);
    const values = Object.values(el);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
    return this.pool.query(
      `UPDATE ${this.table} SET ${valueQuery} WHERE idCities = ?;`,
      [...values, cityId]
    );
  }
}
module.exports = cityManagers;