const adminWallet = require('../models/wallet')

exports.createwallet = async () => {
    const wallet = new adminWallet({
    })
    await wallet.save()
}