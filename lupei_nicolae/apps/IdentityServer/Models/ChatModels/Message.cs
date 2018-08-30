using IdentityServer.Shared;
using IdentityServerWithAspNetIdentity.Models;
using System;

namespace IdentityServer.Models.ChatModels
{
    public class Message : BaseModel
    {
        public ApplicationUser ApplicationUser { get; set; }
        public string ApplicationUserId { get; set; }
        public string Content { get; set; }
    }
}
