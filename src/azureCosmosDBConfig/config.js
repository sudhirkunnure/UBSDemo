var config = {}

config.endpoint = 'https://ksudhirubs.documents.azure.com:443/'
config.key = 'TtTgveyqju7ifRIrlrhVk4lxetvQURQIb0mZGbdYWPX9utbTy3QcjHo9GyGT3p39zu92jN4HEV88ohtQjHm3qg=='
        
config.database = {
  id: 'SanctionSecurityList1'
}

config.container = {
  id: 'SactionCollectionID1'
}

config.items = [
  {
    id: 'India.1',
    Country: 'INDIA',
    ISIN: '823838',
    VALOR:"VALOR",
    CUSIP:"CUSIP",
    DESCRIPTION:"Description",
    SETLLEMENTSTYLE:"Settlement Style",
    TYPEODSECURITY:"Type of Security",
    ISSUEDATE:"01/03/2020",
    MATURITYDATE:"02/03/2020"

   
  },
 
 {
    id: 'CHIN.1',
    Country: 'CHIN',
    ISIN: '823838',
    VALOR:"VALOR1",
    CUSIP:"CUSIP1",
    DESCRIPTION:"Description1",
    SETLLEMENTSTYLE:"Settlement Style1",
    TYPEODSECURITY:"Type of Security1",
    ISSUEDATE:"01/03/2020",
    MATURITYDATE:"02/03/2020"

   
  },
 
  {
    id: 'USA.1',
    Country: 'USA',
    ISIN: '823838',
    VALOR:"VALOR2",
    CUSIP:"CUSIP2",
    DESCRIPTION:"Description2",
    SETLLEMENTSTYLE:"Settlement Style2",
    TYPEODSECURITY:"Type of Security2",
    ISSUEDATE:"01/03/2020",
    MATURITYDATE:"02/03/2020"

   
  },
 
]

module.exports = config
