import Layout from "../Layout";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Contract } from "@packages/api/models/contract";
import { GetTenantContractRequest } from "../../requests/ContractsRequest";

interface ContractPageProps {
  userIsTenant?: boolean;
}

const ContractPage: React.FC<ContractPageProps> = ({ userIsTenant }) => {
  const { currentUser } = useContext(AuthContext);

  const [contract, setContract] = useState<Contract | undefined>(undefined);

  useEffect(() => {
    if (currentUser) {
      if (userIsTenant) {
        GetTenantContractRequest(currentUser.id).then((c) => setContract(c));
      }
    }
  }, [currentUser]);

  useEffect(() => console.log(contract), [contract]);
  return <Layout pageTitle="Contract inchiriere"></Layout>;
};

export default ContractPage;
