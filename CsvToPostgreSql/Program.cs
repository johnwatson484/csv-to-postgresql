using System;
using System.Collections.Generic;

namespace CsvToPostgreSql
{
    class Program
    {

        static void Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("CSV To PostgreSQL");
            Console.ResetColor();

            bool gatheringParams = true;

            while (gatheringParams)
            {
                Console.WriteLine("Enter table name for insert");
                string tableName = Console.ReadLine();
                while (string.IsNullOrEmpty(tableName))
                {
                    LogError("Invalid table name");
                    tableName = Console.ReadLine();
                }

                Console.WriteLine("Enter filepath to CSV");
                string csvPath = Console.ReadLine();
                while (string.IsNullOrEmpty(csvPath))
                {
                    LogError("Invalid filepath");
                    csvPath = Console.ReadLine();
                }


                gatheringParams = false;
            }
        }

        private static void LogError(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(string.Format("{0} - please retry", message));
            Console.ResetColor();
        }
    }
}
