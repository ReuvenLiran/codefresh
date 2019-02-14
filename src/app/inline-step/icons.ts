const COGS_ICON = "/assets/progress-gear.svg";
const DOCKER_ICON = "/assets/progress-docker.svg";
const GIT_ICON = "/assets/trigger-type-git.svg";

const GIT_CLONE_STEP = 'main_clone';
const DOCKER_BUILD_STEP = 'build';

export default step => {
  switch(step) {
    case GIT_CLONE_STEP:
      return GIT_ICON;
    case DOCKER_BUILD_STEP: 
      return DOCKER_ICON;
    default:
      return COGS_ICON;
  }
}

// export default {
//   "Initializing Process": "",
//   "main_clone": GIT_ICON,
//   "install_dependencies": "",
//   "calculate_version": "",
//   "eslint": "",
//   "test": "",
//   "build": "",
//   "push": "",
//   "push_latest": "",
//   "test_reporting_step": "",
//   "create_git_tag": "",
//   "release_binaries": "",
//   "build_binaries": "",
// }