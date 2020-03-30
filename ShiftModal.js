import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class ShiftModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
    this.hideModal = this.hideModal.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  hideModal() {
    this.props.onHideModal();
  }

  handleChangeDate(date) {
    this.setState({
      selectedDate: date
    });
  }

  render() {
    let shiftData = [];
    if (this.state.selectedDate) {
      shiftData = this.props.shiftData.filter(s => {
        return moment(this.state.selectedDate).isSame(s.start_time, "day");
      });
    }
    return (
      <div className="w3-modal w3-block">
        <span onClick={this.hideModal} className="closeBtn w3-display-topright">
          &times;
        </span>
        <div className="w3-modal-content w3-animate-zoom w3-card-4">
          <h4 className="w3-dark-grey w3-padding-small">
            {this.props.memName}'s Activity
          </h4>
          <div className="w3-container">
            <div className="w3-padding-16">
              <label>
                <b>Date: </b>
              </label>
              <DatePicker
                placeholder="select date"
                selected={this.state.selectedDate}
                onChange={this.handleChangeDate}
              />
            </div>
            {shiftData.map(s => {
              return (
                <div key={s.start_time} className="w3-padding w3-padding-16">
                  <span className="w3-round w3-border w3-border-blue w3-padding-small w3-pale-blue">
                    {moment(s.start_time).format("hh:mm A")}
                  </span>
                  &nbsp;-&nbsp;
                  <span className="w3-round w3-border w3-border-blue w3-padding-small w3-pale-blue">
                    {moment(s.end_time).format("hh:mm A")}
                  </span>
                </div>
              );
            })}
            {shiftData.length > 0 && (
              <p>
                <b>{shiftData.length}</b> shift(s) found.
              </p>
            )}
            {shiftData.length === 0 && (
              <p className="w3-pale-red w3-border w3-border-red w3-text-red w3-padding-small w3-round">
                {this.state.selectedDate
                  ? "No data found for the selected date, please try a different date."
                  : "Select a date to see the activity periods."}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
