namespace szobaelrendezo.Model
{
    public class Room
    {
        public List<Furniture> furnitures { get; set; } = new List<Furniture>();

        public float Widht { get; set; }

        public float Height { get; set; }

        public Room(float widht, float height)
        {

            Widht = widht;
            Height = height;

        }

        public Room() { }
    }
}
