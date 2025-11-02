import React from 'react';

export default function SweetItem({ s, onPurchase, onEdit, onDelete, isAdmin }) {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5>
            {s.name} <small className="text-muted">({s.category})</small>
          </h5>
          <p className="mb-1">{s.description}</p>
          <div>
            Price: ₹{s.price} &nbsp; | &nbsp; Qty: {s.quantity}
          </div>
        </div>

        <div>
          <button
            className="btn btn-success me-2"
            onClick={() => onPurchase(s)}
            disabled={s.quantity === 0}
          >
            Purchase
          </button>

          {isAdmin && (
            <>
              <button className="btn btn-secondary me-2" onClick={() => onEdit(s)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => onDelete(s)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
