"use client"; // 确保这是一个客户
import NotificationManager from "@/components/Notification";
import { Button } from "@/components";

const App = () => {
  return (
    <NotificationManager>
      {({ showNotification }) => (
        <div>
          <Button
            onClick={() => showNotification("操作成功！", "success")}
            className="mb-2"
          >
            成功
          </Button>
          <Button
            onClick={() => showNotification("操作失败！", "error")}
            variant="danger"
            className="mb-2"
          >
            失败
          </Button>
          <Button
            onClick={() => showNotification("警告！", "warning")}
            variant="warn"
            className="mb-2"
          >
            警告
          </Button>
          <Button
            onClick={() => showNotification("操作成功！", "success")}
            className="mb-2"
          >
            成功2
          </Button>
          <Button
            onClick={() => showNotification("操作失败！", "error")}
            variant="danger"
            className="mb-2"
          >
            失败2
          </Button>
        </div>
      )}
    </NotificationManager>
  );
};

export default App;
