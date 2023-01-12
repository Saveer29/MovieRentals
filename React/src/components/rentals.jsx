import React, { Component } from "react";
import { getRentals } from "./../services/rentalService";
import Table from "./common/table";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class rentals extends Component {
  columns = [
    { path: "customer.name", label: "Name" },
    { path: "customer.phone", label: "Phone" },
    { path: "customer.isGold", label: "Gold Memebrship" },
    { path: "movie.title", label: "Title" },
    { path: "movie.dailyRentalRate", label: "Rate" },
    { path: "dateOut", label: "Date Out" },
    { path: "dateReturned", label: "Date Returned" },
    { path: "rentalFee", label: "Rental Fee" },
  ];
  state = {
    rentals: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",

    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals });
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

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      rentals: allrentals,
      searchQuery,
    } = this.state;

    let filtered = allrentals;
    if (searchQuery) {
      filtered = allrentals.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const rentals = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: rentals };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data } = this.getPagedData();

    return (
      <div>
        <p>Showing {totalCount} rentals in the database.</p>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
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

export default rentals;
