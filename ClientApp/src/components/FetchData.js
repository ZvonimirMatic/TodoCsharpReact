import { useRequest } from "ahooks";

export default function FetchData() {
  const { data, loading } = useRequest(() => fetch('api/WeatherForecast').then(response => response.json()));

  return (
    <div>
      <h1 id="tableLabel">Weather forecast</h1>

      <p>This component demonstrates fetching data from the server.</p>
      
      {loading
        ? <p><em>Loading...</em></p>
        : (
          <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
              <tr>
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {data.map(forecast =>
                <tr key={forecast.date}>
                  <td>{forecast.date}</td>
                  <td>{forecast.temperatureC}</td>
                  <td>{forecast.temperatureF}</td>
                  <td>{forecast.summary}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
    </div>
  )
}
