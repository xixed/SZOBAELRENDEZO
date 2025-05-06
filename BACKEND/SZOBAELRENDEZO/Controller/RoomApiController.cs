using Microsoft.AspNetCore.Mvc;
using SZOBAELRENDEZO.Data;
using SZOBAELRENDEZO.Model;

namespace SZOBAELRENDEZO.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class RoomApiController : ControllerBase
    {
        IRoomRepository repo;


        public RoomApiController(IRoomRepository repo)
        {
            this.repo = repo;
        }


        [HttpGet]
        public Room GetRooms()
        {
            return this.repo.Read();
        }

        [HttpPost("room")]
        public void CreateRoom([FromBody] Room room)
        {
            this.repo.Create(room);
        }



        [HttpPost("furniture")]

        public void CreateFurniture([FromBody] Furniture furniture)
        {
            this.repo.Update(furniture);
        }

        [HttpDelete]
        public void DeleteFurniture([FromBody] Furniture furniture)
        {
            this.repo.Delete(furniture);
        }


        [HttpDelete("reset")]

        public void Reset()
        {
            this.repo.Reset();
        }
    }
}
