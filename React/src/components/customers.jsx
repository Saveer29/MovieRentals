import React, { Component } from "react";
import { getCustomers, deleteCustomer } from "./../services/customerService";
import Table from "./common/table";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class Customers extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "phone", label: "Phone" },
    { path: "isGold", label: "Gold Membership" },
    {
      key: "delete",
      content: (customer) => (
        <button
          onClick={() => this.handleDelete(customer)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  state = {
    customers: [],
    pageSize: 5,
    currentPage: 1,
    searchQuery: "",

    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = async (customer) => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter((m) => m._id !== customer._id);
    this.setState({ customers });

    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This customer has alredy been deleted");
      this.setState({ customers: originalCustomers });
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      customers: allCustomers,
      searchQuery,
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery) {
      filtered = allCustomers.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data } = this.getPagedData();

    return (
      <div>
        <p>Showing {totalCount} customers in the database.</p>

        <SearchBox
          value={searchQuery}
          onChange={this.handleSearch}
          placeHolder={"Search for a customer..."}
        />
        <Table
          columns={this.columns}
          data={data}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default Customers;
