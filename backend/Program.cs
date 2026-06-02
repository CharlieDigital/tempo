var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.

var summaries = new[]
{
    "Freezing",
    "Bracing",
    "Chilly",
    "Cool",
    "Mild",
    "Warm",
    "Balmy",
    "Hot",
    "Sweltering",
    "Scorching",
};

app.MapGet(
    "/weatherforecast",
    () =>
    {
        var forecast = Enumerable
            .Range(1, 5)
            .Select(index => new WeatherForecast(
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                summaries[Random.Shared.Next(summaries.Length)]
            ))
            .ToArray();
        return forecast;
    }
);

app.MapGet(
    "/pollenforecast",
    () =>
    {
        var forecast = Enumerable
            .Range(1, 5)
            .Select(index => new
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                PollenLevel = Random.Shared.Next(0, 10),
            })
            .ToArray();
        return forecast;
    }
);

app.MapGet(
    "/airqualityforecast",
    () =>
    {
        var forecast = Enumerable
            .Range(1, 5)
            .Select(index => new
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                AirQualityIndex = Random.Shared.Next(0, 500),
            })
            .ToArray();
        return forecast;
    }
);

// Add UV index to forecast
app.MapGet(
    "/uvindexforecast",
    () =>
    {
        var forecast = Enumerable
            .Range(1, 5)
            .Select(index => new
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                UVIndex = Random.Shared.Next(0, 11),
            })
            .ToArray();
        return forecast;
    }
);

app.MapGet(
    "/windforecast",
    () =>
    {
        var forecast = Enumerable
            .Range(1, 5)
            .Select(index => new
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                WindSpeedKph = Random.Shared.Next(0, 100),
            })
            .ToArray();
        return forecast;
    }
);

app.MapGet(
    "/humidityforecast",
    () =>
    {
        var forecast = Enumerable
            .Range(1, 5)
            .Select(index => new
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                HumidityPercent = Random.Shared.Next(0, 100),
            })
            .ToArray();
        return forecast;
    }
);

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
