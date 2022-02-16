import React from "react"
import { Row, Spinner } from "react-bootstrap"
import BillTestimonies from "../BillTestimonies/BillTestimonies"
import AddTestimony from "../AddTestimony/AddTestimony"
import BillName from "../BillName/BillName"
import BillHistory from "../BillHistory/BillHistory"
import BillCosponsors from "../BillCosponsors/BillCosponsors"
import BillStatus from "../BillStatus/BillStatus"
import { useBill } from "../db"
import BillReadMore from "../BillReadMore/BillReadMore"

const ViewBillPage = props => {
  const { bill, loading } = useBill(props.billId)

  return loading ? (
    <Row>
      <Spinner animation="border" className="mx-auto" />
    </Row>
  ) : (
    <>
      <Row>
        <div className=" d-flex justify-content-center">
          <BillName bill={bill} />
          <BillHistory bill={bill} />
          <BillCosponsors bill={bill} />
          <BillStatus bill={bill} />
        </div>
      </Row>
      <div className="text-center">
        <h4>
          {bill
            ? bill.BillNumber + "  General Court: " + bill.GeneralCourtNumber
            : ""}
        </h4>
        <h4>{bill ? bill.Title : ""}</h4>
      </div>
      <div>
        {bill && bill.DocumentText != null
          ? <>
          <span> {bill.DocumentText.substring(1, 700) + "..." } </span>
          {bill.DocumentText.length > 700 ? <BillReadMore bill={bill}/> : null}
          </>
          : ""}
      </div>
      <BillTestimonies bill={bill} />
      <AddTestimony bill={bill} />
    </>
  )
}

export default ViewBillPage