import React, { lazy, Suspense, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdminTable from './AdminTable'
const TopicTable = lazy(() => import("./TopicTable.jsx"));

export default function Index() {
  const [activeTab, setActiveTab] = useState("legalCode");
  return (
    <div style={{ padding: "30px 30px" }}>
      <Tabs
        id="controlled-tab-example"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="legalCode" title="Legal Code">
          <Suspense fallback={"Loading..."}>
            <AdminTable />
          </Suspense>
        </Tab>
        <Tab eventKey="topic" title="Training Topic">
            {activeTab === 'topic' && (
                <Suspense fallback={"Loading..."}>
            <TopicTable />
          </Suspense>
            )}
        </Tab>
      </Tabs>
    </div>
  );
}
