import React, { useRef } from "react";
import { Button } from "./ui/Button";
import { Field, Form, Formik } from "formik";

import { BasicSelect, DateINput, MyField } from "./MyField";
import { useAuth } from "../context/AuthContext";
import { Alerts } from "./Alerts";
import { PageHeader } from "./ui/PageHeader";
import { SectionCard } from "./ui/Card";
import { StatTile } from "./ui/Stat";
import { PageLoader, Spinner } from "./ui/Loading";
import {
  IconBanknote,
  IconCalculator,
  IconCard,
  IconCoins,
  IconHome,
  IconNote,
  IconReceipt,
} from "./ui/icons";

import {
  countCoins,
  countNote,
  payments,
  sales,
  Statevalues,
} from "../helper/inputshelper";

import { useRouter } from "next/router";
import { convertCurrencyToal } from "./charts/IncomeChart";

const FieldGrid = ({ items }: any) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
    {items.map(({ label, name, placeholder }: any) => (
      <Field
        key={name.toString()}
        label={label}
        name={name}
        placeholder={placeholder}
        type="text"
        size="small"
        component={MyField}
      />
    ))}
  </div>
);

export const RegisterHours = ({ id }: any) => {
  const { user } = useAuth();
  const router = useRouter();
  const valueRef = useRef() as any;
  const [dailyUpdate, setDailyUpdate] = React.useState(null) as any;
  const [totalCountedCash, setTotalCountedCash] = React.useState(0) as any;

  const [loading, setLoading] = React.useState(true);
  const [fdc, setFdc] = React.useState(null) as any;
  const [addReport, setAddReport] = React.useState(null) as any;
  const [isAddReport, setIsAddReport] = React.useState(false) as any;

  React.useEffect(() => {
    fetch(id ? `/api/dailyreports/report?id=${id}` : `/api/dailyreports/report`)
      .then((res) => res.json())
      .then(({ response }) => {
        setFdc(response[0]);
        const byId = response.find((item: any) => item.id === +id);

        setDailyUpdate(byId);
        setLoading(false);
      });
  }, [user]);

  React.useEffect(() => {
    const time = setTimeout(() => {
      if (addReport == "Data Added successfully!") router.push("/reports");
    }, 1000);

    return () => clearTimeout(time);
  }, [addReport, router]);

  async function addCommentHandlerPrisma(inputsValue: any) {
    return await fetch("/api/dailyreports/report/", {
      method: "POST",
      body: JSON.stringify({
        ...inputsValue,
        id: +id,
        displayName: user.displayName,
        employeeId: user.uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())

      .catch((error) => console.error(error));
  }

  if (loading) {
    return <PageLoader label="Loading register…" />;
  }

  const Coins = {
    twenty_kr: fdc?.twenty_kr,
    ten_kr: fdc?.ten_kr,
    five_kr: fdc?.five_kr,
    two_kr: fdc?.two_kr,
    one_kr: fdc?.one_kr,
    half_kr: fdc?.half_kr,
  };
  const Note = {
    one_thousand_kr: fdc?.one_thousand_kr,
    five_hundred_kr: fdc?.five_hundred_kr,
    two_hundred_kr: fdc?.two_hundred_kr,
    one_hundred_kr: fdc?.one_hundred_kr,
    fifty_kr: fdc?.fifty_kr,
  };

  const noteTotal = getTotal(Note);
  const coinsTotal = getTotal(Coins);

  const cashOut = fdc.cashOut || 0;
  const opening = noteTotal + coinsTotal - cashOut;

  let formikvalues;

  if (id) {
    const {
      card_28,
      card_43,
      cashOut,
      closingDate,
      comments,
      fifty_kr,
      five_hundred_kr,
      five_kr,
      half_kr,
      invoices,
      mobile_pay,
      one_hundred_kr,
      one_kr,
      one_thousand_kr,
      other,
      productSales,
      reason,
      ten_kr,
      twenty_kr,
      two_hundred_kr,
      two_kr,
    } = dailyUpdate;

    formikvalues = {
      card28: +card_28,
      card43: +card_43,
      mobilePay: +mobile_pay,
      invoices: +invoices,
      "1000s": +one_thousand_kr / 1000,
      "500s": +five_hundred_kr / 500,
      "200s": +two_hundred_kr / 200,
      "100s": +one_hundred_kr / 100,
      "50s": +fifty_kr / 50,
      "20s": +twenty_kr / 20,
      "10s": +ten_kr / 10,
      "5s": +five_kr / 5,
      "2s": +two_kr / 2,
      "1s": +one_kr / 1,
      half: +half_kr / 0.5,
      comments: comments,
      productSales: +productSales,
      other: +other,
      closingDate: closingDate,
      cashOut: +cashOut,
      reason: reason,
    };
  } else {
    formikvalues = Statevalues;
  }

  const countCash = () => {
    const values = valueRef.current.values;

    let total = 0;
    for (const key in values as any) {
      const element = +values[key];

      if (element && money[key]) {
        total += element * money[key];
      }
    }
    setTotalCountedCash(total);
  };

  return (
    <div className="app-shell">
      <PageHeader
        title={id ? "Edit register report" : "Close register"}
        subtitle={
          id
            ? "Update the numbers of an existing closing report"
            : "Count the drawer, log the sales and close the day"
        }
        icon={<IconHome className="h-5 w-5" />}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <StatTile
          label="Opening FDC"
          value={convertCurrencyToal(opening)}
          tone="amber"
          icon={<IconBanknote className="h-5 w-5" />}
          hint="From the previous shift"
        />
        <StatTile
          label="Counted cash"
          value={convertCurrencyToal(totalCountedCash)}
          tone="brand"
          icon={<IconCalculator className="h-5 w-5" />}
          hint="Notes and coins below"
          action={
            <Button variant="secondary" size="sm" onClick={countCash}>
              Count
            </Button>
          }
        />
      </div>

      <Formik
        initialValues={formikvalues}
        innerRef={valueRef}
        onSubmit={async (value) => {
          try {
            if (!value.productSales) {
              alert("Fill Product Sales Inputs");
            } else {
              setIsAddReport(true);
              const response = await addCommentHandlerPrisma(value);
              setAddReport(response.message);
              setIsAddReport(false);
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {() => (
          <Form className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SectionCard
                title="Sales"
                icon={<IconReceipt className="h-4 w-4" />}
              >
                <FieldGrid items={sales} />
              </SectionCard>
              <SectionCard
                title="Payments"
                icon={<IconCard className="h-4 w-4" />}
              >
                <FieldGrid items={payments} />
              </SectionCard>
              <SectionCard
                title="Count Coins"
                icon={<IconCoins className="h-4 w-4" />}
              >
                <FieldGrid items={countCoins} />
              </SectionCard>
              <SectionCard
                title="Count Notes"
                icon={<IconNote className="h-4 w-4" />}
              >
                <FieldGrid items={countNote} />
              </SectionCard>
            </div>

            <SectionCard
              title="Cash out & closing date"
              icon={<IconBanknote className="h-4 w-4" />}
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  name="cashOut"
                  placeholder="Cash out"
                  label="Cash out"
                  color="error"
                  type="text"
                  size="small"
                  component={MyField}
                />
                <Field
                  name="reason"
                  placeholder="Reason"
                  label="Reason"
                  type="text"
                  component={BasicSelect}
                />
                <Field
                  placeholder="Date"
                  name="closingDate"
                  label="Closing date"
                  type="date"
                  component={DateINput}
                  required={true}
                />
              </div>
            </SectionCard>

            <SectionCard title="Comments" icon={<IconNote className="h-4 w-4" />}>
              <Field
                name="comments"
                placeholder="Anything worth noting about this shift?"
                label="Comments"
                multiline
                rows={5}
                type="textArea"
                component={MyField}
                required={false}
              />
            </SectionCard>

            {addReport && (
              <Alerts
                msg={addReport}
                severity={
                  addReport === "Data Added successfully!" ? "success" : "error"
                }
              />
            )}

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isAddReport}
                icon={
                  isAddReport ? (
                    <Spinner className="h-4 w-4 border-white/40 border-t-white" />
                  ) : null
                }
              >
                {isAddReport ? "Saving…" : "Close Register"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const getTotal = (obj: any) => {
  let total = 0;

  for (const key in obj) {
    const element = +obj[key];
    total += element;
  }
  return total;
};

const money = {
  half: 0.5,
  "1s": 1,
  "2s": 2,
  "5s": 5,
  "10s": 10,
  "20s": 20,
  "50s": 50,
  "100s": 100,
  "200s": 200,
  "500s": 500,
  "1000s": 1000,
} as any;
