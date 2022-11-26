const state = {
  commission: {
    status: false,
    slots: "1/5",
  },
};

function handleStateChange(open, min, max) {
  state.commission = {
    status: open,
    slots: `${min}/${max}`,
  };
}

module.exports = {
  handleStateChange,
  state,
};
