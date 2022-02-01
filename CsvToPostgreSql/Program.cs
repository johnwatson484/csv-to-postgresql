using System;
using System.IO;
using System.Globalization;
using System.Collections.Generic;
using CsvHelper;

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
                string csvFilepath = Console.ReadLine();
                while (string.IsNullOrEmpty(csvFilepath))
                {
                    LogError("Invalid filepath");
                    csvFilepath = Console.ReadLine();
                }
                
                string outboundFolder = Path.Combine(AppContext.BaseDirectory, "output");
                Directory.CreateDirectory(outboundFolder);

                using (var reader = new StreamReader(csvFilepath))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    var records = csv.GetRecords<dynamic>();
                    foreach (var item in records)
                    {
                        Console.WriteLine(item);
                    }
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
