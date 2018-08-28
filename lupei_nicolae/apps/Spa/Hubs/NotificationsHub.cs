using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServerWithAspNetIdentity.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace Spa.Hubs
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class NotificationsHub : Hub
    {
        /// <summary>
        /// Store connections on memory
        /// </summary>
        public static readonly ConnectionMapping Connections = new ConnectionMapping();

        private readonly ApplicationDbContext _context;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public NotificationsHub(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// On web app load
        /// </summary>
        /// <returns></returns>
        public Task OnLoad(Guid id)
        {
            Connections.Add(new SignalrConnection
            {
                ConnectionId = Context.ConnectionId,
                UserId = id
            });
            return Task.CompletedTask;
        }
        /// <summary>
        /// Send message
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public Task SendMessage(string message)
        {
            var current = Context.ConnectionId;
            var userId = Connections.GetUserByConnectionId(current);
            var req = Connections.GetAllWhitoutCurrent(userId);
            var sender = _context.Users.FirstOrDefault(x => x.Id.Equals(userId.ToString()));
            foreach (var conn in req)
            {
                Clients.Clients(conn).SendCoreAsync("OnReceive", new object[] { sender, message });
            }
            return Task.CompletedTask;
        }
        /// <inheritdoc />
        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }
        /// <inheritdoc />
        /// <summary>
        /// On User disconnect
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Connections.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }

    // ReSharper disable once ClassNeverInstantiated.Global
    public class NameUserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.Name)?.Value;
        }
    }
}
