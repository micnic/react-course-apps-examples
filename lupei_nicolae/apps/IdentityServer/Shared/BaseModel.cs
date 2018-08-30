using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityServer.Shared
{
    public class BaseModel
    {
        public Guid Id { get; set; }
        public DateTime Added { get; set; }
        public DateTime Changed { get; set; }
        public bool IsDeleted { get; set; }
        public Guid AddedBy { get; set; }
        public Guid ChangedBy { get; set; }
    }
}
