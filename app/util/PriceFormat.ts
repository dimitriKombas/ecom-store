const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK'
    }).format(amount / 100);
}

export default formatPrice;