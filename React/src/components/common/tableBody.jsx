import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if (_.get(item, column.path) === undefined) return "Not Returned";
    if (_.get(item, column.path) === true) return "Gold Member";
    if (_.get(item, column.path) === false) return "Regular Member";
    if (typeof _.get(item, column.path) === "string") {
      if (_.get(item, column.path).slice(-4) === "000Z")
        return _.get(item, column.path).slice(0, 10);
    }
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
