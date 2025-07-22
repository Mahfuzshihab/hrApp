import { useState } from 'react';
import './styles/App.css';
import useAxios from './hooks/useAxios';

const animalEmoji = (animal) => {
  const emojiMap = {
    Swan: '🦢',
    Falcon: '🦅',
    Squirrel: '🐿️',
    Beaver: '🦫',
    Leopard: '🐆',
    Tiger: '🐅',
    Deer: '🦌',
    Lynx: '🐱',
    Seal: '🦭',
    Moose: '🫎'
  };
  return emojiMap[animal] || '🐾';
};

const calculateYears = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const hadAnniversary =
    now.getMonth() > start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());
  if (!hadAnniversary) years--;
  return years;
};

const EmployeeCard = ({ employee, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    salary: employee.salary,
    location: employee.location,
    department: employee.department,
    skills: employee.skills.join(', ')
  });

  const { patch } = useAxios();
  const yearsAtCompany = calculateYears(employee.startDate);

  let statusNote = null;

  if (yearsAtCompany < 5) {
    statusNote = <p>Set up a probation period review.</p>;
  } else if (yearsAtCompany >= 5 && yearsAtCompany <= 10) {
    statusNote = <p>Consider for promotion and salary increase.</p>;
  } else if (yearsAtCompany > 10) {
    statusNote = <p>Potential board member in the making!</p>;
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const showTempMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveChanges = async () => {
    const updates = {
      salary: Number(form.salary),
      location: form.location,
      department: form.department,
      skills: form.skills.split(',').map(s => s.trim())
    };

    try {
      const res = await patch(`/employees/${employee.id}`, updates);
      console.log('Patch response:', res);
      onUpdate(res);
      setEditing(false);
      showTempMessage('Saved successfully!');
    } catch (err) {
      console.error('Update failed', err);
      showTempMessage('Save failed ❌');
    }
  };

  const cancelEdit = () => {
    setForm({
      salary: employee.salary,
      location: employee.location,
      department: employee.department,
      skills: employee.skills.join(', ')
    });
    setEditing(false);
    showTempMessage('Edit canceled');
  };

  return (
    <div className="card">
      <h2 className="name">
        {employee.name} {animalEmoji(employee.animal)}
      </h2>
      <div className="card-para">
        <p><strong>Title:</strong> {employee.title}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Years at company:</strong> {yearsAtCompany}</p>
        {statusNote}

        <div style={{ marginBottom: '10px' }}>
          <button onClick={() => setShowDetails(prev => !prev)} className="details-btn">
            {showDetails ? 'Hide Info' : 'Show Info'}
          </button>

          <button
            onClick={() => showDetails && setEditing(true)}
            className="edit-btn"
            disabled={!showDetails}
            style={{
              marginLeft: '10px',
              opacity: showDetails ? 1 : 0.5,
              cursor: showDetails ? 'pointer' : 'not-allowed'
            }}
          >
            Edit
          </button>
        </div>

        {showDetails && (
          <>
            {!editing ? (
              <>
                <p><strong>Location:</strong> {employee.location}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Phone:</strong> {employee.phone}</p>
                <p><strong>Salary:</strong> €{employee.salary}</p>
                <p><strong>Skills:</strong> {employee.skills.join(', ')}</p>
              </>
            ) : (
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label>Salary:</label>
                <input
                  name="salary"
                  type="number"
                  value={form.salary}
                  onChange={handleInput}
                />

                <label>Location:</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleInput}
                />

                <label>Department:</label>
                <input
                  name="department"
                  value={form.department}
                  onChange={handleInput}
                />

                <label>Skills (comma-separated):</label>
                <input
                  name="skills"
                  value={form.skills}
                  onChange={handleInput}
                />

                <div style={{ marginTop: '10px' }}>
                  <button onClick={saveChanges} className="save-btn">Save</button>
                  <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                </div>
              </div>
            )}
            {message && (
              <p style={{
                color: message.includes('success') ? 'green' : 'red',
                marginTop: '10px',
                fontWeight: 'bold'
              }}>
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
