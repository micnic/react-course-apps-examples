using System;
using System.Collections.Generic;
using System.Linq;

namespace Spa.Hubs
{
    public class ConnectionMapping
    {
        private readonly HashSet<SignalrConnection> _connections = new HashSet<SignalrConnection>();

        public void Add(SignalrConnection connection) => _connections.Add(connection);
        /// <summary>
        /// Check if connection exists
        /// </summary>
        /// <param name="connectionId"></param>
        /// <returns></returns>
        public bool Exists(string connectionId) => _connections.Select(x => x.ConnectionId).ToList().Contains(connectionId);
        /// <summary>
        /// Get connections of user by id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public IEnumerable<string> GetConnectionsOfUserById(Guid userId)
        {
            var response = new List<string>();
            foreach (var conn in _connections)
            {
                if (conn.UserId.Equals(userId))
                {
                    response.Add(conn.ConnectionId);
                }
            }
            return response;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
	    public IEnumerable<string> GetAllWhitoutCurrent(Guid userId)
        {
            var response = new List<string>();
            foreach (var conn in _connections)
            {
                if (!conn.UserId.Equals(userId))
                {
                    response.Add(conn.ConnectionId);
                }
            }
            return response;
        }
        /// <summary>
        /// Get user by connection id
        /// </summary>
        /// <param name="connId"></param>
        /// <returns></returns>
	    public Guid GetUserByConnectionId(string connId)
        {
            foreach (var conn in _connections)
            {
                if (conn.ConnectionId.Equals(connId))
                {
                    return conn.UserId;
                }
            }

            return Guid.Empty;
        }
        /// <summary>
        /// Remove connection
        /// </summary>
        /// <param name="connection"></param>
        public void Remove(string connection)
        {
            var exists = this.Exists(connection);
            if (!exists) return;
            var toRemove = _connections.FirstOrDefault(x => x.ConnectionId.Equals(connection));
            _connections.Remove(toRemove);
        }
        /// <summary>
        /// Count of connections
        /// </summary>
        /// <returns></returns>
        public long Count() => _connections.Count;
    }
    /// <summary>
    /// Signalr connection
    /// </summary>
    public class SignalrConnection
    {
        public string ConnectionId { get; set; }
        public Guid UserId { get; set; }
    }

    public class SignalrEmail
    {
        public Guid UserId { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public List<string> EmailRecipients { get; set; }
    }
    public abstract class SignalrSendMethods
    {
        public const string SendClientEmail = "SendClientEmailNotification";
        public const string SendClientNotification = "SendClientNotificationNotification";
    }
}

