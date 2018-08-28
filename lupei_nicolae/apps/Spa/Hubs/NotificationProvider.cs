using System;
using System.Linq;
using IdentityServerWithAspNetIdentity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Spa.Abstraction;

namespace Spa.Hubs
{
    /// <inheritdoc />
    // ReSharper disable once ClassNeverInstantiated.Global
    public class NotificationProvider : INotificationHub
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHubContext<NotificationsHub> _hubContext;

        public NotificationProvider(UserManager<ApplicationUser> userManager, IHubContext<NotificationsHub> hubContext)
        {
            _userManager = userManager;
            _hubContext = hubContext;
        }
        /// <inheritdoc />
        /// <summary>
        /// Sent email notification
        /// </summary>
        /// <param name="userEmailNotification"></param>
        public void SentEmailNotification(SignalrEmail userEmailNotification)
        {
            var fromUser = _userManager.Users.FirstOrDefault(x => x.Id == userEmailNotification.UserId.ToString());
            if (userEmailNotification?.EmailRecipients == null) return;
            foreach (var x in userEmailNotification?.EmailRecipients)
            {
                var user = _userManager.Users.FirstOrDefault(y => y.Id.Equals(x));
                if (user == null) return;
                var userConnections = NotificationsHub.Connections.GetConnectionsOfUserById(Guid.Parse(user.Id));
                userConnections.ToList().ForEach(c =>
                {
                    _hubContext.Clients.Client(c).SendAsync(SignalrSendMethods.SendClientEmail,
                        userEmailNotification.Subject, userEmailNotification.Message, fromUser?.Email, fromUser?.UserName);
                });
            }
        }
    }
}
