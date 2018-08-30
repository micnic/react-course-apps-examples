using System.Collections.Generic;
using System.Linq;
using IdentityServer.Models.ChatModels;
using IdentityServerWithAspNetIdentity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Spa.Controllers
{
    [Route("api/[controller]")]
    public class ChatController : Controller
    {
        /// <summary>
        /// Inject db context
        /// </summary>
        public readonly ApplicationDbContext _context;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public ChatController(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Get all messages
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public IEnumerable<Message> GetAll()
        {
            var messages = _context.Messages.ToList();

            foreach (var message in messages)
            {
                message.ApplicationUser = _context.Users.FirstOrDefault(x => x.Id.Equals(message.ApplicationUserId));
            }
            return messages;
        }
    }
}
