import React from "react";
import {
  chunkProjects,
  getCurrentResource,
  getContainingResourceFor,
  tracksQuota,
} from "../../lib/utils";
import {
  globalStore,
  domainStoreActions,
  createCommitmentStoreActions,
  domainStore,
} from "../StoreProvider";
import ProjectTableDetails from "./ProjectTableDetails";
import {
  Stack,
  Filters,
  SearchInput,
  Pagination,
  ContentAreaToolbar,
  DataGrid,
  DataGridHeadCell,
  DataGridRow,
  LoadingIndicator,
  Button,
} from "juno-ui-components";

// Display the project details in DomainView
const ProjectTable = (props) => {
  const { serviceType, currentResource, currentCategory, currentAZ, projects } =
    props;
  const { scope } = globalStore();
  const { previousProject } = domainStore();
  const { setPreviousProject } = domainStoreActions();
  const { setShowCommitments } = domainStoreActions();
  const { setSortedProjects } = domainStoreActions();
  const { setTransferProject } = createCommitmentStoreActions();
  const { setCurrentProject } = createCommitmentStoreActions();
  const { setToast } = createCommitmentStoreActions();
  const [filteredProjects, setFilteredProjects] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [input, setInput] = React.useState(null);

  console.log(currentResource.name, projects)

  const projectTableHeadCells = [
    {
      key: "projectName",
      label: "ProjectName",
    },
    {
      key: "resourceBar",
      label: "Status",
    },
    {
      key: "labels",
      label: "Labels",
    },
    {
      key: "Actions",
      label: "Actions",
    },
  ];
  // TODO: Make the colum sizes dynamic, text should probably be ellipsis.
  const gridColumSize = scope.isDomain()
    ? "25% 35% 20% 20%"
    : "25% 30% 20% 25%";
  // Tailwind only accepts complete class names as string, otherwise it won't create the corresponding CSS.
  const colSpan = "col-span-4";

  // Refreshes our filtered data.
  // Filter exsists => only set the projects to filter, not all projects.
  React.useEffect(() => {
    const chunkedProjects = chunkProjects(projects);
    if (input) {
      filterProjects(input);
    } else {
      setFilteredProjects(chunkedProjects);
    }
  }, [projects, input]);

  function updateShowCommitments(index) {
    const projects = [...filteredProjects];
    const project = filteredProjects[currentPage][index];
    const projectID = filteredProjects[currentPage][index].metadata.id;
    const previousProjectID = previousProject?.metadata?.id;
    setCurrentProject(project);
    // Disable the last clicked project
    if (previousProject && projectID != previousProjectID) {
      setShowCommitments(previousProjectID, false);
    }
    // A click on the same (active) project disables it. Otherwise it enables it.
    setShowCommitments(projectID, !project.showCommitments);

    // Track the previous project.
    setPreviousProject(project);
    setFilteredProjects(projects);
  }

  // Change the displayed projects corresponding to its filtered string
  // The show commitment state will be transferred to filtered projects.
  function filterProjects(input) {
    const regex = new RegExp(input, "i");
    let filteredProjects = [];
    const filtered = projects.filter((project) => {
      const filterName = scope.isCluster()
        ? project.metadata.fullName
        : project.metadata.name;
      return regex.exec(filterName) || regex.exec(project.metadata.id);
    });
    filteredProjects.push(filtered);
    const chunkedProjects = chunkProjects(filteredProjects[0]);
    setFilteredProjects(chunkedProjects);
  }

  function handleCommitmentTransfer(project) {
    setTransferProject(project);
  }

  return projects ? (
    <>
      <ContentAreaToolbar className={"p-0 sticky top-24 z-[100]"}>
        <Stack className="w-full" direction="horizontal" distribution="between">
          <Stack>
            <Filters
              search={
                <SearchInput
                  onChange={(e) => {
                    setInput(e.target.value);
                    setCurrentPage(0);
                    filterProjects(e.target.value);
                  }}
                  onClear={() => {
                    setInput(null);
                  }}
                />
              }
            />
            <Button
              onClick={() => {
                setToast(null);
                setSortedProjects(projects);
              }}
              className={"m-auto"}
            >
              Sort
            </Button>
          </Stack>
          <Pagination
            currentPage={currentPage + 1}
            onPressNext={() => {
              currentPage < filteredProjects.length - 1 &&
                setCurrentPage(currentPage + 1);
            }}
            onPressPrevious={() =>
              currentPage > 0 && setCurrentPage(currentPage - 1)
            }
            pages={filteredProjects.length}
            onKeyPress={(e) => {
              e.preventDefault();
              const value = Number(e.target.value) - 1;
              value < filteredProjects.length &&
                value >= 0 &&
                setCurrentPage(value);
            }}
            variant="input"
          />
        </Stack>
      </ContentAreaToolbar>
      <DataGrid
        columns={projectTableHeadCells.length}
        gridColumnTemplate={gridColumSize}
      >
        <DataGridRow>
          {projectTableHeadCells.map((headCell) => (
            <DataGridHeadCell
              key={headCell.key}
              className={"p-0 sticky top-40 z-[100]"}
            >
              {headCell.label}
            </DataGridHeadCell>
          ))}
        </DataGridRow>
        {filteredProjects.length > 0 &&
          filteredProjects[currentPage].map((project, index) => {
            const { categories } = project;
            const { resources } = Object.values(categories)[0];
            const resource = getCurrentResource(
              resources,
              currentResource.name
            );
            const resourceTracksQuota = tracksQuota(currentResource);
            const parentResource = getContainingResourceFor(
              resources,
              currentResource.name
            );
            const az = resource.per_az.filter((az) => {
              const azName = az[0];
              return azName === currentAZ;
            });
            return (
              <ProjectTableDetails
                key={project.metadata.id}
                index={index}
                showCommitments={
                  filteredProjects[currentPage][index].showCommitments
                }
                updateShowCommitments={updateShowCommitments}
                handleCommitmentTransfer={handleCommitmentTransfer}
                serviceType={serviceType}
                currentCategory={currentCategory}
                project={project}
                resource={resource}
                parentResource={parentResource}
                tracksQuota={resourceTracksQuota}
                az={az[0]}
                currentAZ={currentAZ}
                colSpan={colSpan}
              />
            );
          })}
      </DataGrid>
    </>
  ) : (
    <LoadingIndicator className={"m-auto"} />
  );
};

export default ProjectTable;
