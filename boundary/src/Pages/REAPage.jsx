import { TextInput, Dropdown, Button, Label, Spinner } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { BsArrowDownShort } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import AgentCard from "../Components/Agent/AgentCard";
import { AuthContext } from "../Components/Authentication/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function REAPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [agent, setAgent] = useState([
    {
        email: "agent@agent.com",
        first_name: "name",
        last_name: "last_name",
        phone: "123",
        avg_rating: 2.403
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ minRate: 0, maxRate: 5 });

  useEffect(() => {
    if (token) {
      axios
                    .get(
                        "/api/user/search_rea",
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    )
                    .then((res) => {
                      if (res.status === 200) {
                        setAgent(res.data.results);
                      }
                    })
                    .catch((err) => {navigate("/login")})
                    .then(() => setLoading(false))
    }
  }, [])

  const displayLoading = () => {
    return (
      <div className="text-center text-8xl">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  };

  const checkSearchFilter = (agentJson) => {
        let search_bool = agentJson.first_name
			.toLowerCase()
			.startsWith(search.toLowerCase());
		let search_bool2 = agentJson.last_name
			.toLowerCase()
			.startsWith(search.toLowerCase());
		let search_bool3 = agentJson.first_name
			.concat(" ", agentJson.last_name)
			.toLowerCase()
			.startsWith(search.toLowerCase());
        return (search_bool || search_bool2 || search_bool3) &&
        (agentJson.avg_rating >= filter.minRate && agentJson.avg_rating <= filter.maxRate);
};

const searchFilter = (agents) => {
    let filtered_list = [];
    agents.forEach((agentJson) => {
        if (checkSearchFilter(agentJson)) {
            filtered_list.push(
                <AgentCard
                    key={agentJson.email}
                    firstName={agentJson.first_name}
                    lastName={agentJson.last_name}
                    email={agentJson.email}
                    phone={agentJson.phone}
                    rating={agentJson.avg_rating}
                />
            );
        }
    });
    return filtered_list;
};

  const displayList = (agents) => {
    return searchFilter(agents);
};

const displayEmptyList = () => {
    return <span>No matching accounts found.</span>;
};

  return (
    <div className="mx-10 my-6">
      <div className="flex flex-wrap justify-between">
        <TextInput
          icon={FaSearch}
          sizing="lg"
          type="text"
          className="w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Real estate Agent"
        />
        <Dropdown
          label="Dropdown button"
          renderTrigger={() => (
            <Button
              size="lg"
              className="bg-custom_purple1 flex flex-row justify-center align-middle items-center"
              color="purple"
            >
              Filter
              <BsArrowDownShort className="ml-2" size={24} />
            </Button>
          )}
        >
          <div className="flex flex-col w-44 m-4">
            <Label className="font-normal">Rating Range:</Label>
            <div className="w-full bg-gray-200 rounded-full h-1.5 relative mt-6">
              <div
                className="bg-indigo-300 h-1.5 rounded-full absolute"
                style={{
                  left: `${(filter.minRate / 5) * 100}%`,
                  right: `${100 - (filter.maxRate/ 5) * 100}%`,
                }}
              ></div>
            </div>
            <div className="relative mb-6 top-[-7px]">
              <input
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value < filter.maxRate) {
                    setFilter({
                      ...filter,
                      minRate: value,
                    });
                  }
                }}
                min={0}
                max={5}
                id="medium-range"
                type="range"
                value={filter.minRate}
                step={0.1}
                className="absolute w-full h-2 bg-gray-200 bg-transparent rounded-lg appearance-none dark:bg-gray-700 pointer-events-none"
              ></input>
              <input
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value > filter.minRate) {
                    setFilter({
                      ...filter,
                      maxRate: value,
                    });
                  }
                }}
                min={0}
                max={5}
                id="medium-range"
                type="range"
                value={filter.maxRate}
                step={0.1}
                className="absolute w-full h-2 bg-gray-200 bg-transparent rounded-lg appearance-none dark:bg-gray-700 pointer-events-none"
              ></input>
              <style>
                {`
                        input::-webkit-slider-thumb {
                            pointer-events: auto;
                        }
                        `}
              </style>
            </div>
            <div className="flex flex-row justify-between">
              <Label className="font-normal">{filter.minRate} star</Label>
              <Label className="font-normal">{filter.maxRate} star</Label>
            </div>
          </div>
        </Dropdown>
      </div>
      <div className="mt-8">
        {loading ? displayLoading() : displayList(agent)}
        {!loading && searchFilter(agent).length == 0 && displayEmptyList()}
      </div>
    </div>
  );
}

export default REAPage;
