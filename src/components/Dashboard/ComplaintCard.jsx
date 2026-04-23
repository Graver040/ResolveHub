const ComplaintCard = ({ data }) => {
    return (
        <div className="complaint-card">
            <h3 className="card-title">{data.title}</h3>
            <p className="card-status">Status: <strong>{data.status}</strong></p>
            <p className="card-date">{data.date}</p>
        </div>
    );
};

export default ComplaintCard;