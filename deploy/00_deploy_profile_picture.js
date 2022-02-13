module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    await deploy('ProfileNFT', {
        from: deployer,
        log: true,
    });
};
module.exports.tags = ['ProfileNFT'];
