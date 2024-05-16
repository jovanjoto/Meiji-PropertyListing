import { Card, Spinner, Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Components/Authentication/AuthContext";
import { Line } from "react-chartjs-2";
import { getMonth, getYear } from "date-fns";

const theme = {
  root: {
    children: "flex h-full flex-col gap-4 p-6",
  },
};

const displayViz = (listing) => {
  const aggregatedData = {};
  listing.forEach((property) => {
    const transactionDate = new Date(property.transaction_date);
    if (aggregatedData[transactionDate]) {
      aggregatedData[transactionDate] += property.price;
    } else {
      aggregatedData[transactionDate] = property.price;
    }
  });
  console.log(aggregatedData);
  const months = Object.keys(aggregatedData).sort((b, a) => new Date(b.date) - new Date(a.date))
  const salesData = months.map((month) => aggregatedData[month]);
  const salesLabel = months.map((month) => `${getMonth(month)+1}/${getYear(month)}`);

  const data = {
    labels: salesLabel,
    datasets: [
      {
        label: "Sales",
        data: salesData,
        fill: false,
      },
    ],
  };
  return <Line data={data} />;
};

const SGDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const displayLoading = () => {
  return (
    <div className="text-center text-8xl">
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
  );
};

const displayNoStats = () => {
    return (
        <div className="h-full flex justify-center items-center mt-4">
          <p className="text-center text-xl">No Sold listing yet</p>
        </div>
      );
};

function AgentDashboardPage() {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState([]);
  useEffect(() => {
    axios
      .get("/api/property_listing/search_managed_sold", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setProperty(res.data.properties);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return loading ? (
    displayLoading()
  ) : property.length === 0 ? (
    displayNoStats()
  ) : (
    <div className="flex flex-row m-4 gap-4">
      <Card className="min-w-[32rem]" theme={theme}>
        <h1 className="text-2xl">Sold Listing</h1>
        <Table className="w-full">
          <Table.Head>
            <Table.HeadCell>Property Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {property.map((propertyJson) => (
              <Table.Row key={propertyJson.id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {propertyJson.name}
                </Table.Cell>
                <Table.Cell>S{SGDollar.format(propertyJson.price)}</Table.Cell>
                <Table.Cell>{propertyJson.transaction_date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card className="w-full">
        <h1 className="text-2xl">Total Earnings</h1>
        {displayViz(property)}
      </Card>
    </div>
  );
}

export default AgentDashboardPage;
