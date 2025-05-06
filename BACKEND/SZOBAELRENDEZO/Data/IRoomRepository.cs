using SZOBAELRENDEZO.Model;

namespace SZOBAELRENDEZO.Data
{
    public interface IRoomRepository
    {
        void Create(Room room);
        Room Read();

        void Update(Furniture furniture);
        void Delete(Furniture furniture);

        void Reset();
    }
}
