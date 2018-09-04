using IdentityServer.Shared;

namespace IdentityServer.Models.NoteModels
{
    public class Note : BaseModel
    {
        public string Name { get; set; }
        public string Content { get; set; }
    }
}
