import { useState, useEffect } from 'react'
import DataTable from './components/Table'
import './index.css';

// URL and Bearer token stored in .env file, please check README for more prior running repo 
const url = process.env.REACT_APP_URL
const authHeader = {
  headers: {
    Authorization: process.env.REACT_APP_AUTH_TOKEN
  }
}

function App() {
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState(members)
  const [teams, setTeams] = useState({})
  const [offices, setOffices] = useState({})

  // fetch members, teams and locations
  const getMembers = async () => {
    const res = await fetch(`${url}/members`, authHeader)
    const fetchedMembers = await res.json()
    setMembers(fetchedMembers)
    setFilteredMembers(fetchedMembers)
  }

  const getTeams = async () => {
    const res = await fetch(`${url}/teams`, authHeader)
    const fetchedTeams = await res.json()

    let hashTeams = {}
    fetchedTeams.forEach(team => {
      return hashTeams[team._id] = team.name
    })
    setTeams(hashTeams)
  }

  const getOffices = async () => {
    const res = await fetch(`${url}/offices`, authHeader)
    const fetchedOffices = await res.json()

    let hashOffices = {}
    fetchedOffices.forEach(office => {
      return hashOffices[office._id] = office.name
    })
    setOffices(hashOffices)
  }

  useEffect(() => {
    getMembers()
    getTeams()
    getOffices()
  }, [])

  // list the categories from the available members, i.e. 'All, Drop-In, Active, Contact, Former'
  const allCategories = ['all', ...new Set(members.map((item) => item.calculatedStatus))]
  const itemsPerCategory = (members) => {
    let hashItems = {}

    members.forEach((member) => {
      if (!(member.calculatedStatus in hashItems)) {
        hashItems[member.calculatedStatus] = 1
      } else {
        hashItems[member.calculatedStatus] += 1
      }
    })

    return { 'all': members.length, ...hashItems }
  }

  // filter only the needed members
  const filterItems = (category) => {
    if (category === 'all') {
      setFilteredMembers(members)
      return
    }

    const newItems = members.filter((item) => item.calculatedStatus === category)
    setFilteredMembers(newItems)
  }

  return (
    <div className="App">
      <DataTable
        filterItems={filterItems}
        allCategories={allCategories}
        members={members}
        filteredMembers={filteredMembers}
        itemsPerCategory={itemsPerCategory(members)}
        teams={teams}
        offices={offices}
        url={url}
        authHeader={authHeader}
      />
    </div>
  );
}

export default App;
