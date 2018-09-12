import React from "react"
import PropTypes from "prop-types"

const Sidebar = ({ users }) => (
  <ul>
    { users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);

Sidebar.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
};

export default Sidebar;