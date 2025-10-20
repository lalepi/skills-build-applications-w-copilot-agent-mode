
import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'YOUR_CODESPACE_NAME_HERE';
  const endpoint = `https://${codespace}-8000.app.github.dev/api/activities/`;
  const missingEnv = !process.env.REACT_APP_CODESPACE_NAME;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        {missingEnv && (
          <div className="alert alert-warning">
            <strong>Warning:</strong> REACT_APP_CODESPACE_NAME is not set. API calls will fail.
          </div>
        )}
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <td>{idx + 1}</td>
                  <td><pre className="mb-0">{JSON.stringify(activity, null, 2)}</pre></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activities;
