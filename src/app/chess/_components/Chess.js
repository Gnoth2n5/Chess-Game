"use client";

import { Chess } from "chess.js";
const Chessboard = dynamic(() => import("chessboardjsx"), { ssr: false });
import { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import History from "./History";

export const ChessGame = () => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    setGame(new Chess());
  }, []);

  const [history, setHistory] = useState([]);

  const [whiteCaptured, setWhiteCaptured] = useState([]);
  const [blackCaptured, setBlackCaptured] = useState([]);

  const pieceNames = {
    p: "Tốt",
    n: "Mã",
    b: "Tượng",
    r: "Xe",
    q: "Hậu",
    k: "Vua",
  };

  const handleMove = (move) => {
    const { sourceSquare, targetSquare } = move;

    // Kiểm tra nếu nước đi hợp lệ
    const possibleMoves = game.moves({
      square: sourceSquare,
      verbose: true,
    });

    const isValidMove = possibleMoves.some(
      (possibleMove) => possibleMove.to === targetSquare
    );

    if (!isValidMove) {
      if (game.isCheck()) {
        toastr.error("Lỗi: Nước đi không hợp lệ. Vua đang bị chiếu!");
      } else {
        toastr.error("Lỗi: Nước đi không hợp lệ.");
      }
      return;
    }

    // console.log(game.isCheckmate());

    // Nếu nước đi hợp lệ, tiến hành di chuyển
    const result = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // luôn phong tốt thành Hậu khi đến cuối bàn cờ
    });

    if (result) {
      // Nếu có quân cờ bị ăn
      if (result.captured) {
        const capturedPiece = pieceNames[result.captured]; // Tên đầy đủ của quân cờ bị ăn

        // console.log(capturedPiece);

        if (result.color === "w") {
          // Bên trắng ăn quân của bên đen
          setBlackCaptured((prev) => [...prev, capturedPiece]);
        } else {
          // Bên đen ăn quân của bên trắng
          setWhiteCaptured((prev) => [...prev, capturedPiece]);
        }
      }

      // Lưu lịch sử nước đi
      const newHistory = [
        {
          number: history.length + 1,
          color: result.color,
          from: result.from,
          to: result.san,
          name: result.piece
            ? pieceNames[result.piece.toLowerCase()]
            : "Quân cờ không xác định",
          captured: result.captured ? pieceNames[result.captured] : "",
        },
        ...history,
      ];
      setHistory(newHistory);
    } else {
      toastr.error("Lỗi: Nước đi không hợp lệ.");
    }

    // Kiểm tra trạng thái kết thúc trò chơi sau nước đi hợp lệ
    if (game.isCheckmate()) {
      toastr.success(
        `${game.turn() === "w" ? "Trắng" : "Đen"} đã thắng bằng chiếu bí!`
      );
      resetGame();
    } else if (game.isStalemate()) {
      toastr.info("Trò chơi hòa do hết nước đi.");
      resetGame();
    } else if (game.isDraw()) {
      toastr.info("Trò chơi hòa.");
      resetGame();
    } else if (game.isCheck()) {
      toastr.warning(`${game.turn() === "w" ? "Trắng" : "Đen"} đang chiếu!`);
    }
  };

  const resetGame = () => {
    setGame(new Chess()); // Khởi tạo lại trò chơi mới
    setHistory([]); // Xóa lịch sử nước đi
    setBlackCaptured([]); // Xóa quân cờ đã ăn của bên đen
    setWhiteCaptured([]); // Xóa quân cờ đã ăn của bên trắng
    return;
  };

  // Đối thủ đầu hàng
  const handleSurrender = () => {
    const winner = game.turn() === "w" ? "Đen" : "Trắng";

    toastr.success(`${winner} đã thắng khi đối thủ đầu hàng!`);

    resetGame();
  };

  if (!game) return <div>Loading...</div>;

  return (
    <div className="d-flex gap-5">
      <div>
        <button
          onClick={handleSurrender}
          className="btn btn-danger mb-2"
          type="button"
        >
          Đầu hàng
        </button>
        <button type="button" className="btn btn-primary mb-2 mx-2">
          Lượt: {game.turn() === "w" ? "Trắng" : "Đen"}
        </button>
        <Chessboard
          position={game.fen()}
          onDrop={handleMove}
          draggable={true}
          width={400}
        />
      </div>

      <History
        history={history}
        blackCaptured={blackCaptured}
        whiteCaptured={whiteCaptured}
      />
    </div>
  );
};
