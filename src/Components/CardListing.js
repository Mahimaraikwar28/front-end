import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: ${({ isActive }) => (isActive ? '#333' : '#ccc')};
  color: #fff;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  border: none;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 300px;
`;

const FilterContainer = styled.div`
  position: relative;
  margin-left: 10px;
`;

const FilterButton = styled.button`
  margin-left: 10px;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 200px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
`;

const FilterHeading = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
`;

const FilterSubHeading = styled.h4`
  margin-top: 20px;
  margin-bottom: 5px;
`;

const FilterDropdownSelect = styled.select`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  width: 300px;
  background-color: ${({ cardType }) => (cardType === 'burner' ? '#ffcc00' : '#00ccff')};
  color: #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 4px;
`;

const CardType = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
`;

const CardName = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
`;

const CardDetail = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const App = () => {
  const [activeTab, setActiveTab] = useState('your');
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cardTypeFilter, setCardTypeFilter] = useState('all');
  const [cardNameFilter, setCardNameFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Simulating API request to fetch cards data
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          type: 'burner',
          name: 'Burner Card 1',
          spent: 100,
          available_to_spend: 500,
          status: 'Active',
        },
        {
          id: 2,
          type: 'burner',
          name: 'Burner Card 2',
          spent: 200,
          available_to_spend: 400,
          status: 'Blocked',
        },
        {
          id: 3,
          type: 'subscription',
          name: 'Subscription Card 1',
          spent: 300,
          available_to_spend: 700,
          status: 'Active',
        },
        {
          id: 4,
          type: 'subscription',
          name: 'Subscription Card 2',
          spent: 400,
          available_to_spend: 600,
          status: 'Active',
        },
      ];
      setCards(mockData);
    }, 500);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCardTypeFilter = (event) => {
    setCardTypeFilter(event.target.value);
  };

  const handleCardNameFilter = (event) => {
    setCardNameFilter(event.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filteringCardsByButton = () => {
    let filteredCards = cards;

    if (activeTab === 'your') {
      filteredCards = filteredCards.filter((card) => card.status === 'Active');
    }

    if (searchQuery !== '') {
      filteredCards = filteredCards.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (cardTypeFilter !== 'all') {
      filteredCards = filteredCards.filter((card) => card.type === cardTypeFilter);
    }

    if (cardNameFilter !== 'all') {
      filteredCards = filteredCards.filter((card) => card.name === cardNameFilter);
    }

    return filteredCards.map((card) => (
      <Card key={card.id} cardType={card.type}>
        <CardType>{card.type}</CardType>
        <CardName>{card.name}</CardName>
        <CardDetail>Spent: {card.spent}</CardDetail>
        <CardDetail>Available to spend: {card.available_to_spend}</CardDetail>
        <CardDetail>Status: {card.status}</CardDetail>
      </Card>
    ));
  };

  return (
    <PageContainer>
      <Header>
        <TabsContainer>
          <Tab isActive={activeTab === 'your'} onClick={() => handleTabClick('your')}>
            Your Cards
          </Tab>
          <Tab isActive={activeTab === 'all'} onClick={() => handleTabClick('all')}>
            All Cards
          </Tab>
          <Tab isActive={activeTab === 'blocked'} onClick={() => handleTabClick('blocked')}>
            Blocked Cards
          </Tab>
        </TabsContainer>
      </Header>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />

        <FilterContainer>
          <FilterButton onClick={toggleFilter}>Filter</FilterButton>

          {isFilterOpen && (
            <FilterDropdown>
              <FilterHeading>Filter Options</FilterHeading>
              <FilterSubHeading>Card Type</FilterSubHeading>
              <FilterDropdownSelect value={cardTypeFilter} onChange={handleCardTypeFilter}>
                <option value="all">All</option>
                <option value="burner">Burner</option>
                <option value="subscription">Subscription</option>
              </FilterDropdownSelect>
              <FilterSubHeading>Card Name</FilterSubHeading>
              <FilterDropdownSelect value={cardNameFilter} onChange={handleCardNameFilter}>
                <option value="all">All</option>
                <option value="Burner Card 1">Burner Card 1</option>
                <option value="Burner Card 2">Burner Card 2</option>
                <option value="Subscription Card 1">Subscription Card 1</option>
                <option value="Subscription Card 2">Subscription Card 2</option>
              </FilterDropdownSelect>
            </FilterDropdown>
          )}
        </FilterContainer>
      </SearchContainer>

      <CardContainer>{filteringCardsByButton()}</CardContainer>
    </PageContainer>
  );
};

export default App;