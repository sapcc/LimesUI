import React from "react";
import TransferReceiveModal from "./TransferReceiveModal";
import { PortalProvider } from "@cloudoperators/juno-ui-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { initialCommitmentObject } from "../../../lib/constants";

const transferToken = "5ce23c72246fb03942ce004beb7302bb5f640776b9593211";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
queryClient.setQueryDefaults(["commitmentByToken"], {
  queryFn: () => {
    return {
      commitment: {
        amount: 10,
        service_type: "serviceTypeA",
        resource_name: "resourceNameA",
        transfer_token: transferToken,
      },
    };
  },
});

describe("test transfer receive modal", () => {
  beforeEach(() => {
    queryClient.clear();
  });
  test("successful transfer", async () => {
    const onReceive = jest.fn((project, commitment, transferToken) => {
      expect(project).toEqual({ metadata: { id: "projectA" } });
      expect(commitment.amount).toEqual(10);
      expect(transferToken).toEqual(transferToken);
    });
    const commitment = { ...initialCommitmentObject };
    commitment.amount = 10;
    commitment.duration = "1 year";
    commitment.service_type = "serviceTypeA";
    commitment.resource_name = "resourceNameA";
    render(
      <PortalProvider>
        <QueryClientProvider client={queryClient}>
          <TransferReceiveModal
            title="Receive Commitment"
            subText="Receive"
            currentProject={{ metadata: { id: "projectA" } }}
            serviceType={"serviceTypeA"}
            currentResource={{ name: "resourceNameA" }}
            transferCommitment={onReceive}
            onModalClose={() => {}}
          />
        </QueryClientProvider>
      </PortalProvider>
    );
    // const confirmInput = screen.getByTestId(/confirmInput/i);
    const checkButton = screen.getByTestId("checkToken");
    const tokenInput = screen.getByTestId(/transferTokenInput/i);
    fireEvent.change(tokenInput, { target: { value: transferToken } });
    fireEvent.click(checkButton);
    await waitFor(() => {
      expect(screen.getByText(/commitment found/i)).toBeInTheDocument();
      expect(screen.getByText(10)).toBeInTheDocument();
    });
    const confirmButton = screen.getByTestId(/modalConfirm/i);
    const confirmInput = screen.getByTestId(/confirmInput/i);
    fireEvent.change(confirmInput, { target: { value: "receive" } });
    fireEvent.click(confirmButton);
    expect(onReceive).toHaveBeenCalled();
    const clearButton = screen.getByTestId("clearToken");
    fireEvent.click(clearButton);
    expect(screen.queryByText(/commitment found/i)).toBe(null);
  });
});
