namespace expenses_analysis.Models
{
    public class ExpensesDto
    {
        public int id_Expenses { get; set; }
        public string category { get; set; }
        public int amout_money { get; set; }
        public DateTime date { get; set; }
        public string description { get; set; }
        public int id_User { get; set; }
    }
}
