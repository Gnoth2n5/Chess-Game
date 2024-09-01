import "../chess.css";

export default function History({ history, whiteCaptured, blackCaptured }) {
  return (
    <div className="col-1 w-50">
      <div className="table-container">
        <h3>Lịch sử nước đi</h3>
        <table className="table table-responsive table-striped table-bordered table-hover text-center">
          <thead className="bg-success text-white">
            <th>#</th>
            <th>Màu</th>
            <th>Quân cờ</th>
            <th>Nước đi từ</th>
            <th>Nước đi đến</th>
            <th>Đã ăn</th>
          </thead>
          <tbody>
            {history.map((move, index) => (
              <tr key={index}>
                <td>{move.number}</td>
                <td>{move.color === "w" ? "Trắng" : "Đen"}</td>
                <td>{move.name}</td>
                <td>{move.from}</td>
                <td>{move.to}</td>
                <td>{move.captured}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Quân cờ đã bị ăn</h3>
        <div className="d-flex gap-3 text-center">

          <table className="w-100 table table-striped table-bordered table-hover table-responsive">
            <thead className="bg-success text-white">
              <th>Bên Đen</th>
            </thead>
            <tbody>
              {blackCaptured.map((piece, index) => (
                <tr key={index}>
                  <td>{piece}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="w-100 table table-striped table-bordered table-hover table-responsive">
            <thead className="bg-success text-white">
              <th>Bên Trắng</th>
            </thead>
            <tbody>
              {whiteCaptured.map((piece, index) => (
                <tr key={index}>
                  <td>{piece}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
}
