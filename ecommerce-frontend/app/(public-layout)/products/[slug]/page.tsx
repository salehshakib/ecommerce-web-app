"use client";

import { use, useState } from "react";

import Header from "@/components/header";
import { PriceSelector } from "@/components/product/price-selector";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useCart } from "@/contexts/cart-context";
import { type ProductPrice } from "@/hooks/queries/use-product-prices-query";
import { useProductQuery } from "@/hooks/queries/use-products-query";
import { useCombinedDataContext } from "@/providers/combined-data-provider";
import { useAddCartItemMutation } from "@/hooks/mutations/use-cart-mutations";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const [selectedPriceIds, setSelectedPriceIds] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<ProductPrice | null>(null);
  const [relatedProductPrices, setRelatedProductPrices] = useState<{[key: string]: string}>({});
  const { addToCart, openCart } = useCart();
  const { products } = useCombinedDataContext();
  const addToCartMutation = useAddCartItemMutation();
  const { token } = useAuth();
  const router = useRouter();

  // Fetch product data by slug (assuming slug is the product ID for now)
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProductQuery(resolvedParams.slug);

  const handlePriceSelection = (
    priceIds: string[],
    selectedPriceData: ProductPrice
  ) => {
    setSelectedPriceIds(priceIds);
    setSelectedPrice(selectedPriceData);
  };

  const handleAddToCart = async () => {
    if (!product || !selectedPrice || selectedPriceIds.length === 0) return;

    // If user is not logged in, save to localStorage and redirect to login
    if (!token) {
      try {
        await addToCart({
          productId: product._id,
          productPriceIds: selectedPriceIds,
          quantity: 1,
        });
        // Redirect to login page
        router.push('/login');
      } catch (error) {
        console.error("Failed to save to cart:", error);
        router.push('/login');
      }
      return;
    }

    try {
      // User is logged in - add to server cart
      await addToCart({
        productId: product._id,
        productPriceIds: selectedPriceIds,
        quantity: 1,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Handle error (show toast notification, etc.)
    }
  };

  // Get related products from the same category
  const getRelatedProducts = () => {
    if (!product || !products) return [];

    return products
      .filter((p) => p.category === product.category && p._id !== product._id)
      .slice(0, 4); // Limit to 4 related products
  };

  const relatedProducts = getRelatedProducts();

  // Loading state
  if (productLoading) {
    return <Loading message="Loading product details..." fullScreen />;
  }

  // Error state
  if (productError || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Product Not Found
              </h1>
              <p className="text-gray-600">
                The product you're looking for doesn't exist or has been
                removed.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden">
                <Image
                  src={
                    product.featureImage ||
                    "/luxury-perfume-discovery-set-with-golden-accents.jpg"
                  }
                  alt={product.name}
                  width={800}
                  height={800}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Show product types as labels */}
              {product.type && product.type.length > 0 && (
                <div className="absolute top-4 left-4 bg-white px-2 py-1 text-xs tracking-wider z-10">
                  {product.type[0].name}
                </div>
              )}
              {/* Out of stock indicator */}
              {!product.inStock && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-xs tracking-wider z-10">
                  OUT OF STOCK
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mt-2">{product.brand}</p>

              <div className="mt-6">
                <PriceSelector
                  productId={product._id}
                  onPriceSelect={handlePriceSelection}
                  selectedPriceId={selectedPriceIds[0]}
                />
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Delivery from 08/09/2025
              </p>

              <div className="mt-8">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={
                    !product.inStock ||
                    !selectedPrice ||
                    selectedPriceIds.length === 0
                  }
                  className="w-full"
                >
                  {!product.inStock ? "Out of Stock" : "Add to cart"}
                </Button>
              </div>

              {/* <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-900">
                  COMPLIMENTARY MINIATURE WITH PURCHASE
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Choose a complimentary scented miniature with the purchase of
                  any 75ml, 125ml, or 200ml fragrance.
                </p>
              </div> */}

              {/* <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <Globe className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="mt-2 text-gray-500">Complimentary delivery</p>
                </div>
                <div>
                  <ThumbsUp className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="mt-2 text-gray-500">Complimentary samples</p>
                </div>
                <div>
                  <Heart className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="mt-2 text-gray-500">Responsive customer care</p>
                </div>
              </div> */}

              <div className="mt-8">
                <p className="text-base text-gray-700">{product.description}</p>
              </div>

              {/* <Accordion type="single" collapsible className="w-full mt-8">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Olactive pyramid</AccordionTrigger>
                  <AccordionContent>
                    <p>Top notes: Pear, Lychee, Grapefruit</p>
                    <p>Heart notes: Rose Damascena, Incense, Vetiver</p>
                    <p>Base notes: Vanilla, Musk, Evernyl</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */}
            </div>
          </div>

          {/* Additional Images */}
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                Product Images
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {product.additionalImages.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg bg-gray-50 overflow-hidden"
                  >
                    <Image
                      src={
                        image ||
                        "/luxury-perfume-discovery-set-with-golden-accents.jpg"
                      }
                      alt={`${product.name} detail ${index + 1}`}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Damascena Rose Section */}
          {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                DAMASCENA ROSE
              </h2>
              <p className="mt-4 text-base text-gray-700">
                As global travel expanded, precious ingredients like damascena
                rose made their way to Europe, shaping perfumery.
              </p>
              <p className="mt-4 text-base text-gray-700">
                Honoring tradition with a contemporary touch, Parfums de Marly
                infuses timeless elegance into modern creations. Delina
                transforms damascena rose with cutting-edge molecules, capturing
                18th-century sophistication for today's world.
              </p>
            </div>
            <div className="aspect-video rounded-lg bg-gray-50 overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt="Damascena Rose"
                width={1600}
                height={900}
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}

          {/* You May Also Like */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 mb-12">
              <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                YOU MAY ALSO LIKE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 md:px-8 lg:px-12">
                {relatedProducts.map((relatedProduct, index) => {
                  const productImage = relatedProduct.featureImage || "/luxury-perfume-discovery-set-with-golden-accents.jpg";
                  const outOfStock = !relatedProduct.inStock || !relatedProduct.quantity || relatedProduct.quantity <= 0;
                  const hasMultiplePrices = relatedProduct.prices && relatedProduct.prices.length > 1;

                  // Get selected or first available price
                  const getSelectedPriceData = (product: any) => {
                    if (!product.prices || product.prices.length === 0) {
                      return { price: "N/A", size: "N/A", priceObj: null };
                    }

                    const selectedPriceId = relatedProductPrices[product._id];
                    const selectedPrice = selectedPriceId
                      ? product.prices.find((p: any) => p._id === selectedPriceId)
                      : product.prices[0];

                    if (!selectedPrice) {
                      return { price: "N/A", size: "N/A", priceObj: null };
                    }

                    const discountedPrice = selectedPrice.discount
                      ? selectedPrice.price - (selectedPrice.price * selectedPrice.discount / 100)
                      : selectedPrice.price;

                    return {
                      price: `${discountedPrice.toFixed(2)} €`,
                      size: selectedPrice.volume,
                      priceObj: selectedPrice,
                    };
                  };

                  const { price: productPrice, size: productSize } = getSelectedPriceData(relatedProduct);

                  const handlePriceChange = (productId: string, priceId: string) => {
                    setRelatedProductPrices(prev => ({
                      ...prev,
                      [productId]: priceId,
                    }));
                  };

                  const handleAddToCart = async (product: any, e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!product.inStock || !product.quantity || product.quantity <= 0) {
                      return;
                    }

                    if (!product.prices || product.prices.length === 0) {
                      console.warn("No prices available for this product");
                      return;
                    }

                    try {
                      const selectedPriceId = relatedProductPrices[product._id];
                      const selectedPrice = selectedPriceId
                        ? product.prices.find((p: any) => p._id === selectedPriceId)
                        : product.prices[0];

                      if (!selectedPrice) {
                        console.warn("Selected price not found for product");
                        return;
                      }

                      await addToCartMutation.mutateAsync({
                        product: product._id,
                        productPrices: [selectedPrice._id],
                        quantity: 1,
                      });

                      openCart();
                    } catch (error) {
                      console.error("Failed to add product to cart:", error);
                    }
                  };

                  return (
                    <Card
                      key={relatedProduct._id}
                      className={`group bg-white border-0 shadow-none animate-fade-in-up animate-delay-${
                        index * 200
                      } relative w-full max-w-sm mx-auto ${
                        outOfStock ? "opacity-75" : ""
                      }`}
                    >
                      {/* Out of stock badge */}
                      {outOfStock && (
                        <div className="absolute top-4 left-4 z-20 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                          OUT OF STOCK
                        </div>
                      )}

                      <div className="absolute top-4 right-4 z-10">
                        <span className="text-xs font-medium text-muted-foreground tracking-wider italic">
                          {relatedProduct.brand}
                        </span>
                      </div>

                      <div className="p-4 md:p-6 min-h-[520px] md:h-[550px] flex flex-col">
                        <Link href={`/products/${relatedProduct._id}`} className="block">
                          <div className="aspect-[3/4] mb-3 md:mb-6 overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0 cursor-pointer">
                            <img
                              src={productImage}
                              alt={relatedProduct.name}
                              className={`w-full h-full object-contain transition-transform duration-500 ${
                                outOfStock ? "grayscale" : "group-hover:scale-105"
                              }`}
                            />
                          </div>
                        </Link>

                        <div className="text-center space-y-2 md:space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2 md:space-y-4">
                            <Link
                              href={`/products/${relatedProduct._id}`}
                              className="block"
                            >
                              <div className="min-h-[3rem] md:h-14 flex items-center justify-center">
                                <h3 className="font-medium text-base md:text-lg tracking-wider text-foreground leading-tight cursor-pointer hover:text-primary transition-colors">
                                  {relatedProduct.name}
                                </h3>
                              </div>
                            </Link>

                            {/* Price and Volume Display */}
                            <div className="mb-2 md:mb-4 min-h-[50px] flex items-center justify-center">
                              {hasMultiplePrices ? (
                                <div className="flex items-center gap-12 w-full">
                                  {/* Price Display */}
                                  <div className="flex-shrink-0">
                                    <span className="font-medium text-base md:text-lg text-primary">
                                      {productPrice}
                                    </span>
                                  </div>
                                  {/* Volume Dropdown */}
                                  <div className="relative flex-1">
                                    <select
                                      value={
                                        relatedProductPrices[relatedProduct._id] ||
                                        relatedProduct.prices[0]._id
                                      }
                                      onChange={(e) =>
                                        handlePriceChange(
                                          relatedProduct._id,
                                          e.target.value
                                        )
                                      }
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-full px-3 py-2 text-sm font-semibold border border-primary rounded-md bg-white appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                      {relatedProduct.prices.map((priceOption: any) => (
                                        <option
                                          key={priceOption._id}
                                          value={priceOption._id}
                                        >
                                          {priceOption.volume}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                  </div>
                                </div>
                              ) : (
                                // Single price display
                                <div className="flex justify-center">
                                  <span className="font-medium text-base md:text-lg text-primary">
                                    {productPrice}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-auto pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={outOfStock}
                              className={`w-full font-medium tracking-wider text-xs md:text-sm py-2 md:py-3 transition-colors duration-300 ${
                                outOfStock
                                  ? "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50"
                                  : "border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent"
                              }`}
                              onClick={(e) => handleAddToCart(relatedProduct, e)}
                            >
                              {outOfStock ? "OUT OF STOCK" : "ADD TO CART"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
