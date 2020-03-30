import React, { Component } from "react";
import { render } from "react-dom";
import moment from "moment";
import momentTimeZone from "moment-timezone";
import ShiftModal from "./ShiftModal";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
      fetchError: "",
      shiftModalInd: null,
      shiftData: []
    };
    this.fetchData = this.fetchData.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
    this.strToDate = this.strToDate.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  strToDate(str, tz) {
    // str = str.replace("PM", " PM").replace("AM", " AM");
    return momentTimeZone.tz(str, "MMM D YYYY h:m A", tz).toDate();
  }

  fetchData() {
    this.setState({ fetchError: "", members: [] });
    fetch("https://my-json-server.typicode.com/turangis/JSONRESTAPI/userShifts")
      .then(res => {
        return res.json();
      })
      .then(res => {
        // console.log(res);
        if (res && res.ok && res.members) {
          let finRes = res.members.map((r) => {
            r.activity_periods.forEach((a) => {
              a.start_time = this.strToDate(a.start_time, r.tz);
              a.end_time = this.strToDate(a.end_time, r.tz);
            });
            return r;
          });
          // console.log(finRes);
          this.setState({ members: finRes });
        } else {
          throw new Error("Response is not ok");
        }
      })
      .catch(e => {
        this.setState({ fetchError: "Unable to fetch data." });
        console.error("An error occured while fetching the data:\n" + e);
      });
  }

  showModal(ind) {
    this.setState({ shiftModalInd: ind });
  }

  onHideModal() {
    this.setState({ shiftModalInd: null });
  }

  render() {
    return (
      <div className="w3-container w3-padding-16 w3-white wrapDiv">
        <h1 className="w3-text-dark-grey">Users</h1>
        {!this.state.fetchError && (
          <div className="w3-padding">
            {this.state.members.length === 0 && (<div className="w3-large w3-text-indigo">loading...</div>)}
            {this.state.members.length > 0 && (<span>Click on any user below to see their shifts:
            </span>)}
          </div>
        )}
        {this.state.fetchError && this.state.members.length === 0 && (
          <div className="w3-padding w3-center w3-round w3-pale-red w3-border w3-border-red w3-text-red w3-animate-opacity">
            {this.state.fetchError} <br />
            <button
              className="w3-button w3-hover-deep-orange w3-red w3-margin b1"
              onClick={this.fetchData}
            >
              Try Again
            </button>
          </div>
        )}
        {this.state.members.map((m, i) => {
          return (
            <div key={m.id} className="w3-padding w3-animate-opacity">
              <button
                className="w3-button w3-indigo w3-hover-blue w3-block b1"
                onClick={() => {
                  this.showModal(i);
                }}
              >
                {m.real_name}
              </button>
            </div>
          );
        })}
        {this.state.shiftModalInd !== null && (
          <ShiftModal shiftData={this.state.members[this.state.shiftModalInd].activity_periods} memName={this.state.members[this.state.shiftModalInd].real_name} onHideModal = {this.onHideModal}/>
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
