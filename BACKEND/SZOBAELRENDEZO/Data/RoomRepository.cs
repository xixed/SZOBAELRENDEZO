using SZOBAELRENDEZO.Model;

namespace szobaelrendezo.Data
{
    public class RoomRepository : IRoomRepository
    {
        Room rooms;

        public RoomRepository()
        {
            rooms = new Room(0, 0);
        }

        public void Create(Room room)
        {
            this.rooms = room;
        }

        public Room Read()
        {
            return rooms;
        }

        public void Update(Furniture furniture)
        {
            this.rooms.furnitures.Add(furniture);

        }


        public void Delete(Furniture furniture)
        {
            this.rooms.furnitures.Remove(furniture);
        }


        public void Reset()
        {
            this.rooms = new Room(0, 0);
        }
    }
}
