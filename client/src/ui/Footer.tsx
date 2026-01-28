
import Container from './Container'
import payment from '../assets/payment.webp'

const Footer = () => {
const incentives = [
    {
      name: "Free shipping",
      imageSrc:
        "https://www.svgrepo.com/show/419853/delivery-fast-shipping.svg",
      description:
        "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    },
    {
      name: "10-year warranty",
      imageSrc:
        "https://th.bing.com/th/id/R.e895138b3dec5dcfc7d0f82706eb0aa9?rik=wckEypm4i8N23A&pid=ImgRaw&r=0",
      description:
        "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
    },
    {
      name: "Exchanges",
      imageSrc:
        "https://img.freepik.com/premium-vector/handshake-icon_97886-20424.jpg?w=2000",
      description:
        "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
    },
  ];
  
  return (
    
    <div className="mt-10">
      {/* Incentives section */}
      <Container className="py-0">
      <div className=" rounded-2xl bg-[#f6f6f6] px-6 py-16 sm:p-16">
        <div className="mx-auto max-w-xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              We built our business on customer service
            </h2>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-8 sm:max-w-none lg:grid-cols-3">
          {incentives.map((item) => (
            <div
              key={item?.name}
              className="text-center sm:flex sm:text-left lg:block lg:text-center"
            >
              <div className=" sm:shrink-0">
                <div className="flex-root">
                  <img
                    src={item?.imageSrc}
                    alt="image"
                    className="mx-auto h-16 w-16"
                  />
                </div>
              </div>
              <div className="mt-3 sm:ml-6 lg:ml-0">
                <h3 className="text-base font-medium text-gray-900">
                  {item?.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
    
      {/* {footer bottom} */}
      <Container className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <p>@2026 Emeka e-commerce solutions. All rights reserved.</p>
        <img src={payment} alt="payment-img" className="object-cover" />
      </Container>
    


    </div>
  )
}

export default Footer