using System;
using System.Collections.Generic;
using System.Linq;
using IdentityServer.Models.NoteModels;
using IdentityServerWithAspNetIdentity.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Spa.Controllers
{
    [Route("api/[controller]")]
    public class NoteController : Controller
    {
        /// <summary>
        /// Inject db context
        /// </summary>
        public readonly ApplicationDbContext _context;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public NoteController(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Get all messages
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public IEnumerable<Note> GetAll()
        {
            var notes = _context.Notes.Where(x => x.AddedBy.Equals(Guid.Empty)).ToList();

            return notes;
        }
        /// <summary>
        /// Update note
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public bool Update(string data)
        {
            var response = false;
            try
            {
                var note = JsonConvert.DeserializeObject<Note>(data);
                if (note != null)
                {
                    var res = _context.Update(note);
                    if (res.IsKeySet)
                    {
                        response = true;
                    }
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return response;
        }
        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public bool Delete(string id)
        {
            var cast = Guid.Parse(id);
            if (cast == Guid.Empty) return false;
            var obj = _context.Notes.FirstOrDefault(x => x.Id.Equals(cast));
            if (obj == null) return false;
            _context.Notes.Remove(obj);
            _context.SaveChanges();
            return true;
        }
        /// <summary>
        /// Update note
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public bool Add(string data)
        {
            var response = false;
            try
            {
                var note = JsonConvert.DeserializeObject<Note>(data);
                if (note == null) return response;
                var res = _context.Add(note);
                if (res.IsKeySet)
                {
                    response = true;
                }
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return response;
        }
    }
}
